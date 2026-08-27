"use strict";

(() => {
    const body = document.body;
    const videoId = body.dataset.videoId;
    const pageUrl = body.dataset.pageUrl;

    if (!videoId || !pageUrl) {
        return;
    }

    const channelSameAs = [
        "https://www.youtube.com/@wyohanna",
        "https://www.youtube.com/@wyohannagamer",
        "https://www.tiktok.com/@wyohanna",
        "https://instagram.com/_wyohanna",
        "https://facebook.com/HannahDiasOficial"
    ];

    let schemaInjected = false;

    function injectVideoSchema(rawTitle) {
        if (schemaInjected) {
            return;
        }

        schemaInjected = true;

        const title = (rawTitle || `Vídeo infantil HannaH - ${videoId}`).trim();
        const titleElement = document.querySelector("[data-video-title]");

        if (titleElement) {
            titleElement.textContent = title;
        }

        document.title = `${title} | HannaH`;

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.content = `Assista ${title} no hub oficial HannaH. Vídeos para crianças, músicas, historinhas e pretend play organizados por categoria.`;
        }

        const openGraphTitle = document.querySelector('meta[property="og:title"]');
        if (openGraphTitle) {
            openGraphTitle.content = `${title} | HannaH`;
        }

        const schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "VideoObject",
                    "@id": `${pageUrl}#video`,
                    "name": title,
                    "description": "Vídeo incorporado do canal HannaH no YouTube.",
                    "thumbnailUrl": [
                        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
                        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
                    ],
                    "embedUrl": `https://www.youtube.com/embed/${videoId}`,
                    "inLanguage": "pt-BR",
                    "isFamilyFriendly": true,
                    "publisher": {
                        "@id": `${pageUrl}#hannah`
                    },
                    "potentialAction": {
                        "@type": "WatchAction",
                        "target": `https://www.youtube.com/watch?v=${videoId}`
                    }
                },
                {
                    "@type": "Person",
                    "@id": `${pageUrl}#hannah`,
                    "name": "HannaH",
                    "alternateName": [
                        "Wyohanna",
                        "HannahH",
                        "Hannah Dias",
                        "Haninha"
                    ],
                    "image": new URL("../../IMG_4630.jpeg", pageUrl).href,
                    "sameAs": channelSameAs
                },
                {
                    "@type": "WebPage",
                    "@id": `${pageUrl}#page`,
                    "url": pageUrl,
                    "name": `${title} | HannaH`,
                    "mainEntity": {
                        "@id": `${pageUrl}#video`
                    },
                    "about": {
                        "@id": `${pageUrl}#hannah`
                    },
                    "inLanguage": "pt-BR"
                }
            ]
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "runtime-video-schema";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    window.onYouTubeIframeAPIReady = () => {
        try {
            new YT.Player("yt-player", {
                videoId,
                playerVars: {
                    rel: 0,
                    modestbranding: 1
                },
                events: {
                    onReady(event) {
                        let title = "";

                        try {
                            title = event.target.getVideoData().title || "";
                        } catch (error) {
                            console.debug("Título do vídeo ainda indisponível.", error);
                        }

                        injectVideoSchema(title);
                    }
                }
            });
        } catch (error) {
            injectVideoSchema();
        }
    };

    const apiScript = document.createElement("script");
    apiScript.src = "https://www.youtube.com/iframe_api";
    apiScript.async = true;
    document.head.appendChild(apiScript);

    window.setTimeout(() => {
        injectVideoSchema();
    }, 4500);
})();
