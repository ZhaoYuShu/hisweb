// 格式化日期
export default function formatDate (data) {
  let date = new Date(data);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return year + '/' + month + '/' + day;
}
