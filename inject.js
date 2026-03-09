(function () {
    // Load configuration from window.CONFIG (set by config.js) or use defaults
    const CONFIG = window.CONFIG || {
        DEPOP_TOKEN: 'da0def05e094d133febccc58eb9f46d91d4ea896', // Replace with your token
        USERNAME: 'tiffcass83' // Replace with your username
    };

    // Validate configuration
    if (CONFIG.DEPOP_TOKEN === 'depop_tokens') {
        console.error('❌ Please configure your Depop token in inject.js or config.js');
        alert('Depop Refresher: Please add your Depop token. See instructions in inject.js');
        return;
    }

    // Avoid injecting twice
    if (window.__depopHelperInjected) return;
    window.__depopHelperInjected = true;

    // State management
    let isRunning = false;
    let currentIndex = 0;
    let totalItems = 0;
    let successCount = 0;
    let errorCount = 0;

    // Create control panel
    const panel = document.createElement("div");
    panel.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    padding: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 13px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    color: white;
    min-width: 280px;
    cursor: move;
  `;

    const title = document.createElement("div");
    title.textContent = "🔄 Depop Listing Refresher";
    title.style.cssText = `
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 12px;
    cursor: move;
    user-select: none;
  `;

    // Make panel draggable
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    title.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === title) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, panel);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    // Delay input
    const delayContainer = document.createElement("div");
    delayContainer.style.cssText = `
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  `;
    const delayLabel = document.createElement("label");
    delayLabel.textContent = "Delay (sec):";
    delayLabel.style.fontSize = "12px";
    delayLabel.style.color = "black";
    const delayInput = document.createElement("input");
    delayInput.type = "number";
    delayInput.min = "1";
    delayInput.max = "60";
    delayInput.value = "3";
    delayInput.style.cssText = `
    width: 60px;
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    color: black;
  `;
    delayContainer.appendChild(delayLabel);
    delayContainer.appendChild(delayInput);

    // Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = `
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
  `;

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start Refreshing";
    startBtn.style.cssText = `
    flex: 1;
    padding: 8px 12px;
    cursor: pointer;
    background: #48bb78;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 13px;
  `;

    const stopBtn = document.createElement("button");
    stopBtn.textContent = "Stop";
    stopBtn.disabled = true;
    stopBtn.style.cssText = `
    flex: 1;
    padding: 8px 12px;
    cursor: pointer;
    background: #f56565;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 13px;
    opacity: 0.5;
  `;

    buttonContainer.appendChild(startBtn);
    buttonContainer.appendChild(stopBtn);

    // Progress container
    const progressContainer = document.createElement("div");
    progressContainer.style.cssText = `
    background: rgba(0,0,0,0.2);
    border-radius: 8px;
    height: 20px;
    margin-bottom: 10px;
    overflow: hidden;
  `;

    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
    background: #48bb78;
    height: 100%;
    width: 0%;
    transition: width 0.3s;
  `;
    progressContainer.appendChild(progressBar);

    // Status display
    const status = document.createElement("div");
    status.style.cssText = `
    font-size: 12px;
    line-height: 1.6;
    background: rgba(0,0,0,0.2);
    padding: 8px;
    border-radius: 6px;
  `;
    status.innerHTML = "Ready to refresh listings";

    panel.appendChild(title);
    panel.appendChild(delayContainer);
    panel.appendChild(buttonContainer);
    panel.appendChild(progressContainer);
    panel.appendChild(status);
    document.body.appendChild(panel);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function updateStatus(message, type = "info") {
        const emoji = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
        status.innerHTML = `${emoji} ${message}`;
    }

    function updateProgress() {
        if (totalItems > 0) {
            const percentage = ((currentIndex) / totalItems) * 100;
            progressBar.style.width = `${percentage}%`;
            const statsHtml = `
        <div>Progress: ${currentIndex}/${totalItems}</div>
        <div style="font-size: 11px; opacity: 0.9;">✅ Success: ${successCount} | ❌ Errors: ${errorCount}</div>
      `;
            status.innerHTML = statsHtml;
        }
    }

    function resetState() {
        isRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        stopBtn.style.opacity = "0.5";
        startBtn.style.opacity = "1";
    }

    // Get current user's slug from the page
    function getUserSlug() {
        let match = window.location.pathname.match(/\/([^\/]+)\/selling/);
        if (match) return match[1];

        match = window.location.pathname.match(/\/([^\/]+)\/?$/);
        if (match && match[1] && !['products', 'search', 'about'].includes(match[1])) {
            return match[1];
        }

        // Fallback to configured username
        return CONFIG.USERNAME;
    }

    // Fetch user's listings from Depop API
    async function fetchUserListings(limit = 200) {
        try {
            const slug = getUserSlug();

            const url = `https://webapi.depop.com/api/v1/shop/products/?lang=en&cursor=&limit=${limit}&statusFilter=selling&shopSlug=${slug}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${CONFIG.DEPOP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch listings: ${response.status}`);
            }

            const data = await response.json();

            return data.products || [];
        } catch (e) {
            console.error("Error fetching listings:", e);
            throw e;
        }
    }

    // Update a product (this should refresh its position)
    async function updateProduct(productId, productSlug) {
        try {
            // First, get the full product details
            const detailsUrl = `https://webapi.depop.com/presentation/api/v1/products/by-slug/${productSlug}/edit-listing/`;
            const detailsResponse = await fetch(detailsUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${CONFIG.DEPOP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!detailsResponse.ok) {
                throw new Error(`Failed to fetch product details: ${detailsResponse.status}`);
            }

            const productData = await detailsResponse.json();

            // Build full update payload (PUT requires all fields)
            let pictureIds = [];
            if (productData.pictures && Array.isArray(productData.pictures)) {
                pictureIds = productData.pictures.map(p => p.id);
            }

            let shippingMethods = productData.shipping_methods || productData.shippingMethods || [];
            shippingMethods = shippingMethods.map(method => ({
                payer: method.payer,
                shipFromAddressId: method.ship_from_address_id || method.shipFromAddressId,
                shippingProviderId: method.shipping_provider_id || method.shippingProviderId,
                parcelSizeId: method.parcel_size_id || method.parcelSizeId
            }));

            const updatePayload = {
                variants: productData.variants || { 1: 1 },
                variantSetId: productData.variant_set_id || productData.variantSetId || 52,
                productType: productData.product_type || productData.productType || 'tshirts',
                quantity: productData.quantity || null,
                nationalShippingCost: String(productData.national_shipping_cost || productData.nationalShippingCost || productData.national_shipping_price || productData.pricing?.national_shipping_cost || 0),
                shippingMethods: shippingMethods,
                address: productData.address || 'United States of America',
                countryCode: productData.country_code || productData.countryCode || 'US',
                priceAmount: String(productData.price_amount || productData.priceAmount || productData.price || productData.pricing?.price_amount || 1),
                pictureIds: pictureIds,
                condition: productData.condition || 'used_like_new',
                description: productData.description || '',
                gender: productData.gender || 'unisex',
                group: productData.group || 'tops',
                attributes: productData.attributes || {},
                isKids: productData.is_kids || productData.isKids || false,
                colour: Array.isArray(productData.colour) ? productData.colour : (productData.colour ? [productData.colour] : ['black']),
                priceCurrency: productData.pricing?.currency_name || productData.priceCurrency || 'USD',
                geoLat: productData.geo_lat || productData.geoLat || 54.2379333607472,
                geoLng: productData.geo_lng || productData.geoLng || -2.36966957036279,
                boost: { status: 'inactive' },
                shippingAddress: productData.shipping_address || productData.shippingAddress || 36800900
            };

            if (productData.brand_name && productData.brand_name.trim()) {
                updatePayload.brand = productData.brand_name.toLowerCase();
            } else if (productData.brand && productData.brand.trim()) {
                updatePayload.brand = productData.brand.toLowerCase();
            }

            // Try PUT to update the product (uses SLUG not ID!)
            const updateUrl = `https://webapi.depop.com/api/v2/products/${productSlug}/`;

            console.log('📤 Attempting to update product with PUT...');
            const updateResponse = await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${CONFIG.DEPOP_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatePayload)
            });

            if (updateResponse.ok) {
                return true;
            } else {
                const errorText = await updateResponse.text();
                throw new Error(`Update failed: ${updateResponse.status}`);
            }

        } catch (e) {
            console.error("Error updating product:", e);
            throw e;
        }
    }

    async function startRefreshing() {
        if (isRunning) return;

        const delay = parseInt(delayInput.value) * 1000 || 3000;

        try {
            isRunning = true;
            startBtn.disabled = true;
            startBtn.style.opacity = "0.5";
            stopBtn.disabled = false;
            stopBtn.style.opacity = "1";

            updateStatus("Fetching your listings...");
            const products = await fetchUserListings();

            if (products.length === 0) {
                updateStatus("No products found. Make sure you're on your selling page.", "error");
                resetState();
                return;
            }

            // Sort by oldest first
            products.sort((a, b) => {
                const dateA = new Date(a.dateUpdated || a.date_updated || 0);
                const dateB = new Date(b.dateUpdated || b.date_updated || 0);
                return dateA - dateB;
            });

            totalItems = products.length;
            currentIndex = 0;
            successCount = 0;
            errorCount = 0;

            updateStatus(`Found ${totalItems} listings. Starting refresh...`);
            await sleep(1000);

            // Process each product
            for (let i = 0; i < products.length && isRunning; i++) {
                const product = products[i];
                currentIndex = i + 1;

                try {
                    updateProgress();
                    const productName = product.name || product.description?.substring(0, 30) || `Product ${product.id}`;
                    updateStatus(`Refreshing "${productName}"...`);

                    await updateProduct(product.id, product.slug);
                    successCount++;

                    updateProgress();

                    // Wait before processing next item
                    if (i < products.length - 1) {
                        await sleep(delay);
                    }

                } catch (error) {
                    errorCount++;
                    updateProgress();
                    await sleep(1000);
                }
            }

            updateStatus(`Completed! ${successCount} refreshed, ${errorCount} errors`, "success");
            resetState();

        } catch (error) {
            console.error("Error in refresh process:", error);
            updateStatus(`Error: ${error.message}`, "error");
            resetState();
        }
    }

    function stopRefreshing() {
        isRunning = false;
        updateStatus("Stopping...", "info");
        resetState();
    }

    // Event listeners
    startBtn.addEventListener("click", startRefreshing);
    stopBtn.addEventListener("click", stopRefreshing);
})();