function doGet() {
    return HtmlService.createTemplateFromFile("index")
        .evaluate()
        .setTitle("Test React y Typescript")
        .addMetaTag("viewport", "width=device-width, initial-scale=1.0, maximum-scale=1")
        .setFaviconUrl("https://mguerrero.me/imgpublic/ico-google-m.png");
}