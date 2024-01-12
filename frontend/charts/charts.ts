export const legendMargin = {
  id: "legendMargin",
  beforeInit: (chart) => {
    const fitValue = chart.legend.fit;
    chart.legend.fit = function fit() {
      fitValue.bind(chart.legend)();
      return (this.height += 10);
    };
  },
};
