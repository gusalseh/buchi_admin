const { processSheet } = require("../controllers/dataGet");
const { Menu } = require("../models");

// 첫 번째 시트에서 spot 테이블에 넣을 데이터들
const extractSpotInfoSheet = async (req, res) => {
  try {
    const spotData = await processSheet(1);

    const resultRows = spotData.slice(0, 200);

    console.log("length:", resultRows.length);

    return resultRows;
  } catch (error) {
    console.error("Error extracting spot data sheet:", error);
    throw new Error("Failed to extract spot data sheet");
  }
};

// 첫 번째 시트에서 menu 테이블에 넣을 데이터들
const extractMenuInfoSheet = async (req, res) => {
  try {
    const menuData = await processSheet(4);

    const menuTypeMapping = {
      메인메뉴: "maindish",
      사이드메뉴: "sidedish",
      음료: "beverage",
      주류: "liquar",
    };

    const mainDishes = menuData.filter(
      (item) => item["메뉴타입"] === "메인메뉴"
    );
    const sideDishes = menuData.filter(
      (item) => item["메뉴타입"] === "사이드메뉴"
    );
    const liquars = menuData.filter((item) => item["메뉴타입"] === "주류");
    const beverages = menuData.filter((item) => item["메뉴타입"] === "음료");

    let mainDishIndex = 0;
    let sideDishIndex = 0;
    let liquarIndex = 0;
    let beverageIndex = 0;

    // 1~200번까지의 spot_id를 대상으로 처리
    for (let spot_id = 1; spot_id <= 200; spot_id++) {
      const mainDish1 = mainDishes[mainDishIndex];
      const mainDish2 = mainDishes[(mainDishIndex + 1) % mainDishes.length];
      mainDishIndex = (mainDishIndex + 2) % mainDishes.length;

      const sideDish = sideDishes[sideDishIndex];
      sideDishIndex = (sideDishIndex + 1) % sideDishes.length;

      const liquar = liquars[liquarIndex];
      liquarIndex = (liquarIndex + 1) % liquars.length;

      const beverage = beverages[beverageIndex];
      beverageIndex = (beverageIndex + 1) % beverages.length;

      const menus = [mainDish1, mainDish2, sideDish, liquar, beverage];

      for (const menu of menus) {
        const menuType = menuTypeMapping[menu["메뉴타입"]];

        await Menu.create({
          spot_id,
          menu_name: menu["메뉴명"],
          menu_type: menuType,
          price: menu["메뉴가격"],
        });
      }
    }
  } catch (error) {
    console.error("Error setting menu data:", error);
    throw new Error("Failed to set menu data");
  }
};

module.exports = { extractSpotInfoSheet, extractMenuInfoSheet };
