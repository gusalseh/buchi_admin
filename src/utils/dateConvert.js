const excelDateToJSDate = (serial) => {
  const utc_days = Math.floor(serial - 25569); // 엑셀의 기준 날짜인 1900-01-01로부터의 일수를 계산
  const utc_value = utc_days * 86400; // 1일 = 86400초
  const date_info = new Date(utc_value * 1000);

  // 소수점 부분은 시간 정보이므로 처리
  const fractional_day = serial - Math.floor(serial);
  const total_seconds = Math.floor(fractional_day * 86400); // 하루의 초 단위 시간
  const seconds = total_seconds % 60;
  const minutes = Math.floor(total_seconds / 60) % 60;
  const hours = Math.floor(total_seconds / 3600);

  // 자바스크립트 Date 객체에 시간 추가
  date_info.setUTCHours(hours);
  date_info.setUTCMinutes(minutes);
  date_info.setUTCSeconds(seconds);

  return date_info;
};

module.exports = {
  excelDateToJSDate,
};
