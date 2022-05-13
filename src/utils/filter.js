import orders from "../data/orders.json";

const filter = (filterBy, cardType, searchTerms) => {
  console.log(filterBy);
    const contextData = require(`../data/collections/` + cardType);
    let filteredData = [];
    orders[cardType].map((card) => {
      let toFilter;
      let cardData = contextData[card];
      if (typeof cardData[filterBy] === "string") {
        toFilter = cardData[filterBy].toLowerCase();
      } else {
        toFilter = [];
        cardData[filterBy].map((item) => {
          toFilter.push(item.toLowerCase());
          return null;
        });
      }
      let searchSplit = searchTerms.toLowerCase().split("+");
      for (let searchTerm of searchSplit) {
        if (!toFilter.includes(searchTerm)) {
          return null;
        }
      }
      filteredData.push(card);
      return null;
    });
    return filteredData;
};

export default filter;