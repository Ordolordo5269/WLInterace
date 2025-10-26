// Enhanced Data Blocks Animation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedDataBlocks();
});

function initEnhancedDataBlocks() {
    // Get all data blocks
    const dataBlocks = document.querySelectorAll('.data-block');
    
    // Initialize each data block with enhanced animations
    dataBlocks.forEach((block, index) => {
        // Add floating data points to each block
        addDataPoints(block);
        
        // Add hover effects
        addHoverEffects(block);
        
        // Add specific enhancements based on block ID
        if (block.id === 'data-block-1') {
            enhanceAIInsightsBlock(block);
        } else if (block.id === 'data-block-2') {
            enhanceSmarterDecisionsBlock(block);
        }
    });
}

function addDataPoints(block) {
    // Function kept for compatibility but no longer adds floating particles
    // Instead, we'll enhance the block's visual appeal with better gradients
    block.style.background = `linear-gradient(135deg, rgba(16, 42, 67, 0.9), rgba(27, 58, 87, 0.8))`;
    
    // Add subtle border glow
    block.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(56, 189, 248, 0.1), inset 0 0 0 1px rgba(144, 202, 249, 0.2)`;
}

function addHoverEffects(block) {
    // Add interactive hover effects
    block.addEventListener('mouseover', function() {
        // Enhance data lines on hover
        const dataLines = block.querySelectorAll('.data-line');
        dataLines.forEach((line, index) => {
            line.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
        });
    });
    
    block.addEventListener('mouseout', function() {
        // Reset data lines on mouse out
        const dataLines = block.querySelectorAll('.data-line');
        dataLines.forEach((line, index) => {
            line.style.boxShadow = '0 0 8px rgba(56, 189, 248, 0.2)';
        });
    });
}

function enhanceAIInsightsBlock(block) {
    // Add specific enhancements for AI Insights block
    const dataContent = block.querySelector('.data-content');
    
    // Add data visualization elements
    const dataVisContainer = document.createElement('div');
    dataVisContainer.className = 'data-visualization';
    dataVisContainer.innerHTML = `
        <div class="data-chart">
            <div class="chart-bar" style="height: 60%;"></div>
            <div class="chart-bar" style="height: 80%;"></div>
            <div class="chart-bar" style="height: 40%;"></div>
            <div class="chart-bar" style="height: 70%;"></div>
        </div>
    `;
    
    // Insert after data content
    if (dataContent.nextSibling) {
        block.insertBefore(dataVisContainer, dataContent.nextSibling);
    } else {
        block.appendChild(dataVisContainer);
    }
    
    // Animate chart bars
    const chartBars = dataVisContainer.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        bar.style.animation = `chartBarPulse 3s infinite alternate ${index * 0.5}s`;
    });
}

function enhanceSmarterDecisionsBlock(block) {
    // Add specific enhancements for Smarter Decisions block
    const dataContent = block.querySelector('.data-content');
    
    // Add news ticker element
    const newsTicker = document.createElement('div');
    newsTicker.className = 'news-ticker';
    newsTicker.innerHTML = `
        <div class="ticker-container">
            <div class="ticker-item">Breaking news update</div>
            <div class="ticker-item">Market analysis</div>
            <div class="ticker-item">Political developments</div>
            <div class="ticker-item">Economic forecast</div>
        </div>
    `;
    
    // Insert after data content
    if (dataContent.nextSibling) {
        block.insertBefore(newsTicker, dataContent.nextSibling);
    } else {
        block.appendChild(newsTicker);
    }
    
    // Animate ticker items
    const tickerContainer = newsTicker.querySelector('.ticker-container');
    tickerContainer.style.animation = 'tickerScroll 15s linear infinite';
}

// Add these keyframes to the CSS
function addKeyframesToStylesheet() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes chartBarPulse {
            0% { transform: scaleY(0.8); opacity: 0.7; box-shadow: 0 0 10px rgba(56, 189, 248, 0.3); }
            100% { transform: scaleY(1); opacity: 1; box-shadow: 0 0 15px rgba(56, 189, 248, 0.5); }
        }
        
        @keyframes tickerScroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes borderGlow {
            0% { border-color: rgba(144, 202, 249, 0.3); }
            50% { border-color: rgba(144, 202, 249, 0.6); }
            100% { border-color: rgba(144, 202, 249, 0.3); }
        }
    `;
    document.head.appendChild(style);
}

// Call to add keyframes
addKeyframesToStylesheet();