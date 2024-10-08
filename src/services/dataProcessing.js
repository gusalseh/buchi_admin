const { processSheet } = require('../controllers/dataGet');
const { Menu, Visit, SectionLabel } = require('../models');
const { getMenuImages } = require('../aws/s3');
const { getS3Url } = require('../utils/awsUtils');

// 첫 번째 시트에서 spot 테이블에 넣을 데이터들
const extractSpotInfoSheet = async (req, res) => {
  try {
    const spotData = await processSheet(1);

    const resultRows = spotData.slice(0, 200);

    return resultRows;
  } catch (error) {
    console.error('Error extracting spot data sheet:', error);
    throw new Error('Failed to extract spot data sheet');
  }
};

// 첫 번째 시트에서 menu 테이블에 넣을 데이터들
const extractMenuInfoSheet = async (req, res) => {
  try {
    const menuData = await processSheet(4);
    const s3MenuImages = await getMenuImages();
    const menuTypeMapping = {
      메인메뉴: 'maindish',
      사이드메뉴: 'sidedish',
      음료: 'beverage',
      주류: 'liquar',
    };
    const mainSection1TypeMapping = {
      한식: 'korean',
      중식: 'chinese',
      일식: 'japanese',
      양식: 'western',
      아시안: 'asian',
      퓨전: 'fusion',
    };
    const mainSection2ListMapping = {
      pork_belly: ['삼겹살'],
      chicken: ['치킨'],
      grilled_beef: ['갈비구이', '바싹불고기', '불고기', '소고기', '스테이크', '햄버거스테이크'],
      chinese_cuisine: ['마라샹궈', '마파두부', '완탕면', '우육면', '유산슬', '자장면', '짬뽕', '탕수육', '팔보채'],
      sashimi: ['초밥'],
    };

    const getMainSection2 = (menuName) => {
      for (const [section, menuList] of Object.entries(mainSection2ListMapping)) {
        if (menuList.includes(menuName)) {
          return section;
        }
      }
      return null;
    };

    const mainDishes = menuData.filter((item) => item['메뉴타입'] === '메인메뉴');
    const sideDishes = menuData.filter((item) => item['메뉴타입'] === '사이드메뉴');
    const liquars = menuData.filter((item) => item['메뉴타입'] === '주류');
    const beverages = menuData.filter((item) => item['메뉴타입'] === '음료');

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
        const menuType = menuTypeMapping[menu['메뉴타입']];
        const mainMenuType = mainSection1TypeMapping[menu['메뉴구분']];

        const matchingImage = s3MenuImages.find((image) => image.includes(menu['메뉴명']));
        const menu_img = matchingImage ? getS3Url(matchingImage) : null;

        await Menu.create({
          spot_id,
          menu_name: menu['메뉴명'],
          menu_type: menuType,
          price: menu['메뉴가격'],
          menu_img,
        });

        if (menuType === 'maindish') {
          const existingRecord = await SectionLabel.findOne({
            where: { spot_id },
          });

          const mainSection2 = getMainSection2(menu['메뉴명']);

          if (!existingRecord) {
            await SectionLabel.create({
              spot_id,
              main_section_1: mainMenuType,
              main_section_2: mainSection2,
            });
          } else if (!existingRecord.main_section_2 && mainSection2) {
            await existingRecord.update({
              main_section_2: mainSection2,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error setting menu data:', error);
    throw new Error('Failed to set menu data');
  }
};

// 첫 번째 시트에서 visit, review 테이블에 넣을 데이터들
const extractLogInfoSheet = async (req, res) => {
  try {
    const spotData = await processSheet(2);

    spotData.map(async (row, idx) => {
      const spot_id = parseInt(row['식당아이디'].replace('restaurant', ''), 10);
      const visit_id = idx + 1;
      const user_id = (spot_id % 5) + 1;

      console.log(visit_id);
      console.log(user_id);
      console.log(spot_id);
      console.log('-----------');

      // await Visit.create({
      //   visit_id,
      //   user_id,
      //   spot_id,
      // });
    });
  } catch (error) {
    console.error('Error extracting log data sheet:', error);
    throw new Error('Failed to extract log data sheet');
  }
};

module.exports = {
  extractSpotInfoSheet,
  extractMenuInfoSheet,
  extractLogInfoSheet,
};
