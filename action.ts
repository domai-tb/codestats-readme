import * as core from "@actions/core";
import * as fs from "fs";
import { fetchProfile, fetchTopLanguages, fetchHistory } from "./src/fetcher";
import ProfileCard from "./src/cards/ProfileCard";
import TopLanguagesCard from "./src/cards/TopLanguagesCard";
import HistoryCard from "./src/cards/HistoryCard";
import ReactDOMServer from "react-dom/server";
import {
  parseBoolean,
  parseArray,
  parseNumber,
  clampValue,
} from "./src/common/utils";

async function main() {
  try {
    const username = core.getInput("username");

    // Fetch Code::Stats API
    const profile = await fetchProfile(username);
    const toplang = await fetchTopLanguages(username);
    const history = await fetchHistory(username, 32);

    // Generate Profile Summary Card
    const profilecard = ReactDOMServer.renderToStaticMarkup(
      new ProfileCard(profile.username, profile.xp, profile.recentXp, {
        hide: parseArray(core.getInput("hide")),
        show_icons: true, // parseBoolean(core.getInput("show_icons")),
        hide_rank: false, // parseBoolean(core.getInput("hide_rank")),
        line_height: 45, // parseNumber(core.getInput("line_height")),
        title: `Code::Stats of ${username}`, // core.getInput("title"),
        title_color: core.getInput("title_color"),
        icon_color: core.getInput("icon_color"),
        text_color: core.getInput("text_color"),
        bg_color: core.getInput("bg_color"),
        hide_title: false, // parseBoolean(core.getInput("hide_title")),
        hide_border: false, //parseBoolean(core.getInput("hide_border")),
      }).render()
    );

    console.log(`Generated ./codestats_profilecard_${username}.svg`);
    fs.writeFileSync(`./codestats_profilecard_${username}.svg`, profilecard);

    // Generate Top Languages Card
    const toplangcard = ReactDOMServer.renderToStaticMarkup(
      new TopLanguagesCard(username, toplang.langs, {
        hide: parseArray(core.getInput("hide")),
        language_count: 21, // parseNumber(core.getInput("language_count")),
        card_width: clampValue(
          parseNumber(core.getInput("card_width")) || 300,
          500
        ),
        layout: "compact", // core.getInput("layout")
        title: `Code::Stats of ${username}`, // core.getInput("title"),
        title_color: core.getInput("title_color"),
        text_color: core.getInput("text_color"),
        bg_color: core.getInput("bg_color"),
        hide_title: false, // parseBoolean(core.getInput("hide_title")),
        hide_border: false, //parseBoolean(core.getInput("hide_border")),
      }).render()
    );

    console.log(`Generated ./codestats_toplangs_${username}.svg`);
    fs.writeFileSync(`./codestats_toplangs_${username}.svg`, toplangcard);

    // Generate History Card
    const historycard = ReactDOMServer.renderToStaticMarkup(
      new HistoryCard(username, history, {
        hide: parseArray(core.getInput("hide")),
        language_count: 21, // parseNumber(core.getInput("language_count")),
        hide_legend: parseBoolean(core.getInput("hide_legend")),
        reverse_order: parseBoolean(core.getInput("reverse_order")),
        width: clampValue(parseNumber(core.getInput("card_width")) || 300, 500),
        height: clampValue(parseNumber(core.getInput("height")) || 300, 200),
        title_color: core.getInput("title_color"),
        text_color: core.getInput("text_color"),
        bg_color: core.getInput("bg_color"),
        layout: undefined, // core.getInput("layout")
        hide_title: false, // parseBoolean(core.getInput("hide_title")),
        hide_border: false, //parseBoolean(core.getInput("hide_border")),
      }).render()
    );

    console.log(`Generated ./codestats_history_${username}.svg`);
    fs.writeFileSync(`./codestats_history_${username}.svg`, historycard);
  } catch (error) {
    console.log(error);
    //core.setFailed(error.message);
  }
}

main()