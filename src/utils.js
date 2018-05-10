export const formatDate = (sent, splitter) => {
  sent = new Date(sent);
  var dateSentFormatted =
    sent.getFullYear() +
    splitter +
    ("0" + (sent.getMonth() + 1)).slice(-2) +
    splitter +
    ("0" + sent.getDate()).slice(-2) +
    " " +
    ("0" + sent.getHours()).slice(-2) +
    ":" +
    ("0" + sent.getMinutes()).slice(-2);
  return dateSentFormatted;
}

export const sorting = (a, b) =>  a > b ? 1 : a < b ? -1 : 0;

export const message = text => M.toast({ html: text });