const { Event } = require("../../models");

const events = [
  {
    date: "2023-03-29",
    guardId: 1,
    shiftId: 1,
    branchId: 1,
  },
  {
    date: "2023-03-30",
    guardId: 1,
    shiftId: 1,
    branchId: 1,
  },
  {
    date: "2023-03-31",
    guardId: 1,
    shiftId: 2,
    branchId: 1,
  },
  {
    date: "2023-04-01",
    guardId: 1,
    shiftId: 2,
    branchId: 1,
  },
  {
    date: "2023-04-02",
    guardId: 1,
    shiftId: 3,
    branchId: 1,
  },
  {
    date: "2023-04-03",
    guardId: 1,
    shiftId: 3,
    branchId: 1,
  },
  {
    date: "2023-004-04",
    guardId: 2,
    shiftId: 2,
    branchId: 2,
  },
  {
    date: "2023-03-27",
    guardId: 2,
    shiftId: 2,
    branchId: 2,
  },
  {
    date: "2023-03-09",
    guardId: 2,
    shiftId: 3,
    branchId: 2,
  },
  {
    date: "2023-03-10",
    guardId: 2,
    shiftId: 3,
    branchId: 2,
  },
  {
    date: "2023-03-11",
    guardId: 2,
    shiftId: 1,
    branchId: 2,
  },
  {
    date: "2023-03-03",
    guardId: 2,
    shiftId: 1,
    branchId: 2,
  },
  {
    date: "2023-03-26",
    guardId: 4,
    shiftId: 3,
    branchId: 5,
  },
  {
    date: "2023-03-25",
    guardId: 4,
    shiftId: 3,
    branchId: 5,
  },
  {
    date: "2023-03-09",
    guardId: 4,
    shiftId: 1,
    branchId: 5,
  },
  {
    date: "2023-03-10",
    guardId: 4,
    shiftId: 1,
    branchId: 5,
  },
  {
    date: "2023-03-11",
    guardId: 4,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2023-03-03",
    guardId: 4,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2023-03-26",
    guardId: 3,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2023-03-09",
    guardId: 3,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2023-03-03",
    guardId: 3,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2023-03-10",
    guardId: 3,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2023-03-11",
    guardId: 3,
    shiftId: 2,
    branchId: 5,
  }
];

async function createEvents() {
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    await Event.create(event);
  }
  console.log("EVENTS created ok");
}

module.exports = createEvents;
