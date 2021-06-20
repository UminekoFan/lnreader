import cheerio from "react-native-cheerio";

const scrapeTopNovels = async (pageNo) => {
    const url =
        "https://myanimelist.net/topmanga.php?type=lightnovels&limit=" + pageNo;

    const res = await fetch(url);
    const body = await res.text();

    const $ = cheerio.load(body);

    const novels = [];

    $("tr.ranking-list").each(function (res) {
        const novelId = $(this).find("img").attr("data-src").split("/");

        const novelCover =
            "https://cdn.myanimelist.net/images/manga/" +
            novelId[7] +
            "/" +
            novelId[8].split(".")[0] +
            ".jpg";
        const novelName = $(this).find("h3").text();

        const novel = { novelName, novelCover };

        novels.push(novel);
    });

    return novels;
};

const scrapeSearchResults = async (searchTerm) => {
    const url =
        "https://myanimelist.net/manga.php?q=" +
        searchTerm +
        "&cat=manga&type=2";

    const res = await fetch(url);
    const body = await res.text();

    const $ = cheerio.load(body);

    const novels = [];

    $(".list")
        .find("tr")
        .each(function (res) {
            const novelName = $(this).find("a > strong").text();

            if (novelName) {
                const novelId = $(this).find("img").attr("data-src").split("/");

                const novelCover =
                    "https://cdn.myanimelist.net/images/manga/" +
                    novelId[7] +
                    "/" +
                    novelId[8].split(".")[0] +
                    ".jpg";

                const novel = { novelName, novelCover };

                novels.push(novel);
            }
        });

    return novels;
};

export { scrapeTopNovels, scrapeSearchResults };