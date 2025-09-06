#!/bin/bash

# Image Processing and Renaming Script
# This script will rename images with meaningful names and optimize them for web use

cd "/Users/a0g11b6/Desktop/AnshulResume/modern-resume/public/images/Clicked"
OPTIMIZED_DIR="../optimized"

echo "🖼️  Starting image processing and renaming..."

# Create optimized directory if it doesn't exist
mkdir -p "$OPTIMIZED_DIR"

# Function to optimize and rename image
optimize_and_rename() {
    local original="$1"
    local new_name="$2"
    local category="$3"
    
    echo "Processing: $original -> $new_name"
    
    # Convert HEIC to JPG if needed and optimize
    if [[ "$original" == *.heic ]]; then
        sips -s format jpeg -s formatOptions 85 "$original" --out "$OPTIMIZED_DIR/${new_name}.jpg" 2>/dev/null
    else
        # Optimize existing JPG/JPEG files - resize to max 1200px width and compress
        sips -Z 1200 -s formatOptions 85 "$original" --out "$OPTIMIZED_DIR/${new_name}.jpg" 2>/dev/null
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully processed: $new_name.jpg"
    else
        echo "❌ Failed to process: $original"
    fi
}

# Professional/Portrait Photos (2021-2022)
echo "📸 Processing Professional/Portrait Photos..."
optimize_and_rename "IMG_20210215_193525 (1).jpg" "portrait-professional-headshot-2021-02-15" "portrait"
optimize_and_rename "IMG_20211113_173533~2-01 (1)~2 (1).jpg" "portrait-casual-afternoon-2021-11-13" "portrait"
optimize_and_rename "IMG_20211113_181314 (2).jpg" "portrait-evening-style-2021-11-13" "portrait"

# Casual/Personal Photos (2021)
echo "👤 Processing Casual/Personal Photos..."
optimize_and_rename "IMG_20211115_104109.jpg" "casual-morning-lifestyle-2021-11-15" "casual"
optimize_and_rename "IMG_20211125_221145~2 (1).jpg" "casual-night-candid-2021-11-25" "casual"
optimize_and_rename "IMG_20211208_152256.jpg" "casual-afternoon-moment-2021-12-08" "casual"
optimize_and_rename "IMG_20211225_090852~2.jpg" "holiday-christmas-morning-2021-12-25" "holiday"
optimize_and_rename "IMG_20211227_163736 (2).jpg" "holiday-winter-celebration-2021-12-27" "holiday"
optimize_and_rename "IMG_20211228_141140.jpg" "holiday-year-end-gathering-2021-12-28" "holiday"

# Travel/Outdoor Photos (2022)
echo "🌍 Processing Travel/Outdoor Photos..."
optimize_and_rename "IMG_20220213_092316.jpg" "outdoor-morning-adventure-2022-02-13-1" "travel"
optimize_and_rename "IMG_20220213_094257.jpg" "outdoor-morning-adventure-2022-02-13-2" "travel"
optimize_and_rename "IMG_20220213_100950.jpg" "outdoor-morning-adventure-2022-02-13-3" "travel"
optimize_and_rename "20220918_210136.jpg" "lifestyle-evening-capture-2022-09-18" "lifestyle"
optimize_and_rename "20220928_224228.jpg" "night-photography-session-2022-09-28" "photography"
optimize_and_rename "20221005_154719.jpg" "autumn-afternoon-moment-2022-10-05" "seasonal"
optimize_and_rename "20221006_163724.jpg" "outdoor-exploration-2022-10-06" "travel"
optimize_and_rename "IMG_20221008_174307_995.jpg" "golden-hour-portrait-2022-10-08" "portrait"

# Recent Photos (2023)
echo "🆕 Processing Recent Photos..."
optimize_and_rename "20230323_182104.heic" "spring-evening-vibes-2023-03-23-1" "seasonal"
optimize_and_rename "20230323_182105.heic" "spring-evening-vibes-2023-03-23-2" "seasonal"
optimize_and_rename "20230326_155418.jpg" "spring-afternoon-lifestyle-2023-03-26" "lifestyle"
optimize_and_rename "IMG_20230323_134031_257(1).jpg" "midday-spring-portrait-2023-03-23" "portrait"
optimize_and_rename "IMG_20230323_134121_862.webp" "spring-candid-moment-2023-03-23" "casual"
optimize_and_rename "IMG_20230326_125100_993.webp" "noon-lifestyle-shot-2023-03-26" "lifestyle"
optimize_and_rename "20230429_192511.heic" "evening-golden-hour-2023-04-29" "photography"
optimize_and_rename "20230528_165907.jpg" "late-spring-adventure-2023-05-28" "travel"

# Pixel Phone Photos
echo "📱 Processing Pixel Phone Photos..."
optimize_and_rename "PXL_20211114_083846378.jpg" "morning-pixel-capture-2021-11-14-1" "photography"
optimize_and_rename "PXL_20211114_083940160.jpg" "morning-pixel-capture-2021-11-14-2" "photography"
optimize_and_rename "PXL_20211114_083952118.jpg" "morning-pixel-capture-2021-11-14-3" "photography"
optimize_and_rename "PXL_20211210_124246453.NIGHT~2.jpg" "night-mode-photography-2021-12-10" "photography"

# Miscellaneous
echo "📋 Processing Miscellaneous Photos..."
optimize_and_rename "20250823_224345.jpg" "late-night-session-2024-08-23" "lifestyle"

echo "🎉 Image processing complete! Check the optimized directory."
echo "📊 Generating summary..."

# Count processed images
PROCESSED_COUNT=$(ls -1 "$OPTIMIZED_DIR"/*.jpg 2>/dev/null | wc -l)
echo "✅ Successfully processed $PROCESSED_COUNT images"

# Show file sizes
echo "📏 Optimized image sizes:"
ls -lh "$OPTIMIZED_DIR"/*.jpg | awk '{print $9 " - " $5}'
