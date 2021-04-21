const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatMin = function(min) {
  if (min < 10) {
    return "0" + min;
  }
  return min;
};

const formatDate = function(date) {
  var d = date.toDate();
  const year = d.getFullYear();
  const day = d.getDate();
  const monthIndex = d.getMonth();
  const monthName = months[monthIndex];
  const hour = d.getHours();
  const min = d.getMinutes();
  return monthName + " " + day + " " + year + " " + hour + ":" + formatMin(min);
};

export default {
  async fetchFeedList(context) {
    const list = [];
    const res = await context.rootGetters.firestore
      .collectionGroup("posts")
      .limit(25);
    const querySnapshot = await res.get();
    querySnapshot.forEach((doc) => {
      let temp = doc.data();
      temp.timestamp = formatDate(temp.timestamp);
      temp.docid = doc.id;
      temp.userid = doc.ref.path.split("/")[1];
      list.push(temp);
    });
    context.commit("setFeedList", {
      list: list,
    });
  },
  async fetchFeedListByTag(context, tags) {
    const list = [];
    const res = await context.rootGetters.firestore
      .collectionGroup("posts")
      .where("tags", "array-contains-any",tags)
      .limit(25);
    const querySnapshot = await res.get();
    querySnapshot.forEach((doc) => {
      let temp = doc.data();
      temp.timestamp = formatDate(temp.timestamp);
      temp.docid = doc.id;
      temp.userid = doc.ref.path.split("/")[1];
      list.push(temp);
    });
    context.commit("setFeedList", {
      list: list,
    });
  },
};
