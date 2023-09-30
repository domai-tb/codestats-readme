import * as core from "@actions/core";
import * as fs from "fs";
import themes from "./themes/themes.json";
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
    console.log(`Fetch account data: codestats.net/users/${username}`);
    const profile = await fetchProfile(username);
    const toplang = await fetchTopLanguages(username);
    const history = await fetchHistory(
      username,
      parseNumber(core.getInput("history_card_days_count"))
    );

    // Generate Profile Summary Card
    const profilecard = ReactDOMServer.renderToStaticMarkup(
      new ProfileCard(profile.username, profile.xp, profile.recentXp, {
        hide: parseArray(core.getInput("profile_card_hide_lines")),
        show_icons: core.getBooleanInput("profile_card_show_icons"),
        hide_rank: core.getBooleanInput("profile_card_hide_rank"),
        line_height: parseNumber(core.getInput("profile_card_line_height")),
        title: core.getInput("profile_card_title")
          ? core.getInput("profile_card_title")
          : `Code::Stats of ${username}`,
        title_color: core.getInput("common_title_color"),
        icon_color: core.getInput("common_icon_color"),
        text_color: core.getInput("common_text_color"),
        bg_color: core.getInput("common_bg_color"),
        hide_title: core.getBooleanInput("common_hide_title"),
        hide_border: core.getBooleanInput("common_hide_border"),
        theme:
          core.getInput("theme") in themes
            ? (core.getInput("theme") as keyof typeof themes)
            : "default",
      }).render()
    );

    console.log(`Generated ./codestats_profilecard_${username}.svg`);
    fs.writeFileSync(`./codestats_profilecard_${username}.svg`, profilecard);

    // Generate Top Languages Card
    const toplangcard = ReactDOMServer.renderToStaticMarkup(
      new TopLanguagesCard(username, toplang.langs, {
        hide: parseArray(core.getInput("common_hide_languages")),
        language_count: parseNumber(
          core.getInput("toplangs_card_language_count")
        ),
        card_width: 500,
        layout: core.getBooleanInput("toplangs_card_compact_layout")
          ? "compact"
          : undefined,
        title: core.getInput("toplangs_card_title")
          ? core.getInput("toplangs_card_title")
          : `Code::Stats of ${username}`,
        title_color: core.getInput("common_title_color"),
        text_color: core.getInput("common_text_color"),
        bg_color: core.getInput("common_bg_color"),
        hide_title: core.getBooleanInput("common_hide_title"),
        hide_border: core.getBooleanInput("common_hide_border"),
        theme:
          core.getInput("theme") in themes
            ? (core.getInput("theme") as keyof typeof themes)
            : "default",
      }).render()
    );

    console.log(`Generated ./codestats_toplangs_${username}.svg`);
    fs.writeFileSync(`./codestats_toplangs_${username}.svg`, toplangcard);

    // Generate History Card
    const historycard = ReactDOMServer.renderToStaticMarkup(
      new HistoryCard(username, history, {
        hide: parseArray(core.getInput("common_hide_languages")),
        language_count: parseNumber(
          core.getInput("history_card_language_count")
        ),
        hide_legend: core.getBooleanInput("history_card_hide_legend"),
        reverse_order: core.getBooleanInput("history_card_reverse_order"),
        width: 500,
        height: 300,
        title_color: core.getInput("common_title_color"),
        text_color: core.getInput("common_text_color"),
        bg_color: core.getInput("common_bg_color"),
        layout: core.getBooleanInput("history_card_horizontal_layout")
          ? "horizontal"
          : undefined,
        hide_title: core.getBooleanInput("common_hide_title"),
        hide_border: core.getBooleanInput("common_hide_border"),
        theme:
          core.getInput("theme") in themes
            ? (core.getInput("theme") as keyof typeof themes)
            : "default",
      }).render()
    );

    console.log(`Generated ./codestats_history_${username}.svg`);
    fs.writeFileSync(`./codestats_history_${username}.svg`, historycard);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      console.log(error);
    }
  }
}

main();
