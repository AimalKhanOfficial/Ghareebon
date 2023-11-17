const ALL_WEBSITES = [
    //Clothes
    "khaadi",
    "gulahmed",
    "sanasafinaz",
    "alkaramstudio",
    "nishatlinen",
    "asimjofa",
    "bonanzasatrangi",
    "mariab",
    "chinyere",
    "crossstitch",
    "ethnic",
    "shopelan",
    "gulabo",
    "bareeze",
    "houseofcharizma",
    "zeenwoman",
    "junaidjamshed",

    //Food
    "foodpanda",
    "cheetay",
    "bykea",
    "supermeal",

    //Shoes
    "servis",
    "bata",
    "stylo",
    "ecs",
    "metro shoes",
    "insignia",
    "borjan",
    "hush puppies",
    "sole",
    "unze london",
    "regal shoes",
    "shoe planet",
    "mario minardi",
    "scholl",
    "urban sole",
    "borjan",
    "ebh",
    "nike",
    "adidas",
    "reebok",

    //Online Shopping
    "ebay",
    "alibaba",
    "aliexpress",
    "cjdropshipping",
    "samsung",
    "apple",
    "amazon",
    "walmart",
    "flipkart",
    "target",
    "bestbuy",
    "macys",
    "homedepot",
    "lowes",
    "costco",
    "kohls",
    "nordstrom",
    "etsy",
    "wayfair",
    "overstock",
    "zappos",
    "gap",
    "sephora",
    "ulta",
    "newegg",
    "bedbathandbeyond",
    "gamestop",
    "rei",
    "dickssportinggoods",
    "petco",
    "sears",
    "officedepot",
    "barnesandnoble",
    "crateandbarrel",
    "williamssonoma",
    "hsn",
    "grubhub",
    "doordash",
    "ubereats",
    "postmates",
    "instacart",
    "seamless",
    "trycaviar",
    "chownow",
    "delivery",
    "slicelife",
    "daraz",
    "olx",
    "yayvo",
    "telemart",
    "goto",
    "homeshopping",
    "symbios",
    "ishopping",
    "shoprex",
    "shophive",
    "mygerrys",
    "clicky",
    "farjazz",
    "chase",
    "vmart",
    "pakstyle",
    "kaymu",
    "mega",
    "alfatah",
    "tajori",
    "bucket",
    "lootlo",
    "fincera",
    "bnbaccessories",
    "pkbazaar",
    "loot",
    "surmawala",
    "megamart",
    "buyon",
    "lootmart",
    "ezmakaan",
    "martblue",
    "elaan",
    "lootlo",
    "qmart",
    "ishopping",
    "jambo",
    "paklap",
    "ezmakaan",
    "quickneasy",
    "shoppingguru",
    "vmart",
    "hummart",
    "shopistan",
    "lootsale",
    "eitimad",
    "gadget",
    "imart",
    "clicknget",
    "gomart",
    "ezdeals",
    "shopdaily",
    "ishopping",
    "priceoye",
    "dealtoday",
    "savers",
    "laptab",
    "shophive",
    "pakdukaan",
    "dealsnlots",
    "pakmegamart",
    "gigatech",
    "bucketpk",
    "shopngo",
    "zeesol",
    "vmart",
    "shopone",
    "jd",
    "mercadoLibre",
    "zalando",
    "asos",
    "gmarket",
    "tmall",
    "taobao",
    "yandexMarket",
    "bol",
    "cdiscount",
    "ozon",
    "jumia",
    "noon",
    "takealot",
    "myntra",
    "daraz",
    "carrefour",
    "shopee",
    "lazada",
    "tokopedia",
    "grab",
    "foodpanda",
    "deliveroo",
    "justeat",
    "swiggy",
    "zomato",
    "ubereats",
    "glovo",
    "doordash",
    "grubhub",
    "postmates",
    "instacart",
    "deliveryhero",
    "eatigo"
];

const REPEAT_TIME_IN_SECONDS = 10000;

(() => {
    console.log('Content script is running!');

    const websiteMatches = (currentWebsite) => {
        for (let i = 0; i < ALL_WEBSITES.length; i++) {
            if (currentWebsite.includes(ALL_WEBSITES[i])) {
                return true;
            }
        }
        return false;
    }

    const addImageAndAnimate = () => {
        const img = document.createElement('img');
        const imageUrl = chrome.runtime.getURL('assets/shahid.png');
        img.src = imageUrl;
        img.alt = 'Shahid PNG';
        document.body.appendChild(img);
        const cssStyles = `
            position: fixed;
            bottom: -100px;
            height: 320px;
            width: 320px;
            z-index: 9999;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            animation: slideUp 1s ease-in-out forwards;
        `;
        // Define the animation using CSS directly within the content script
        const styles = `
            @keyframes slideUp {
                0% {
                    bottom: -100px;
                    opacity: 0;
                }
                100% {
                    bottom: 0;
                    opacity: 1;
                }
            }
            @keyframes slideDown {
                0% {
                  bottom: 0;
                  opacity: 1;
                }
                100% {
                  bottom: -100px;
                  opacity: 0;
                }
              }
        `;

        // Create a <style> tag and append CSS rules to it
        const styleSheet = document.createElement('style');
        styleSheet.innerText = styles;

        // Append the <style> tag to the document head
        document.head.appendChild(styleSheet);
        img.style.cssText = cssStyles;
        chrome.runtime.sendMessage({ action: 'playAudio' });
        setTimeout(() => {
            img.style.animation = 'slideDown 1s ease-in-out forwards';
        }, 2100);
    }

    function checkWebsite() {
        const currentURL = window.location.href;
        if (websiteMatches(currentURL.toLowerCase())) {
            console.log('You are on the target website:', currentURL);
            setInterval(addImageAndAnimate, REPEAT_TIME_IN_SECONDS);
        }
    }

    // Execute the checkWebsite function when the page loads
    window.addEventListener('load', function () {
        checkWebsite();
    });
})();