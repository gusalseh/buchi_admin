const fs = require("fs").promises; // 파일 시스템 모듈 (Promise 사용)

// JSON 파일을 처리하는 함수
const processJsonData = (jsonData) => {
  try {
    // DATA 배열에서 rdnwhladdr에 "역삼동"이 포함된 데이터 필터링
    const filteredData = jsonData.DATA.filter(
      (item) => item.rdnwhladdr && item.rdnwhladdr.includes("역삼동")
    );

    // 필터된 데이터 중 상위 200개의 데이터만 남김
    const limitedData = filteredData.slice(0, 200);

    // 필터링된 데이터로 새로운 JSON 구조 생성
    const newJsonData = {
      DESCRIPTION: jsonData.DESCRIPTION,
      DATA: limitedData,
    };

    return newJsonData;
  } catch (error) {
    console.error("Error processing JSON data:", error);
    throw error;
  }
};

// 파일을 읽고 가공한 후 새로운 파일로 저장하는 함수
const processFile = async (inputFilePath, outputFilePath) => {
  try {
    // 로컬에서 JSON 파일 읽기
    const fileData = await fs.readFile(inputFilePath, "utf-8");

    // JSON 데이터를 JavaScript 객체로 변환
    const jsonData = JSON.parse(fileData);

    // 데이터 가공
    const processedData = processJsonData(jsonData);

    // 가공된 데이터를 새로운 JSON 파일로 저장
    await fs.writeFile(
      outputFilePath,
      JSON.stringify(processedData, null, 2),
      "utf-8"
    );

    console.log(`File has been processed and saved to ${outputFilePath}`);
  } catch (error) {
    console.error("Error processing the file:", error);
  }
};

// 실제로 사용할 파일 경로 설정 (입력 파일과 출력 파일)
const inputFilePath = "./src/spot_info.json"; // 로컬의 원본 JSON 파일 경로
const outputFilePath = "./src/spot_info_result.json"; // 가공된 JSON 파일이 저장될 경로

// 파일 처리 함수 호출
processFile(inputFilePath, outputFilePath);
