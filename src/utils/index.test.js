import { calculateProcedureOvertime } from ".";
describe("Calculate procedure overTime test", () => {
  it("procedure overtime for local anaesthesia should be zero when duration is equal to estimated duration", () => {
    const type = "localAnaesthesia";
    const procedureDetails = {
      endTime: "2023-12-10T16:25:11.000Z",
      estimatedDuration: 1,
      serviceFee: 100000,
      startTime: "2023-12-10T15:25:11.000Z",
    };
    const anaesthesiaCost = { generalAnaesthesia: 300, localAnaesthesia: 100 };
    const overTime = calculateProcedureOvertime(
      procedureDetails,
      type,
      anaesthesiaCost
    );
    expect(overTime).toStrictEqual({ overtimeCost: 0, procedureHours: 1 });
  });

  it("procedure overtime  for local anaesthesia should be greater than zero when duration is not equal to estimated duration", () => {
    const type = "localAnaesthesia";
    const procedureDetails = {
      endTime: "2023-12-10T18:25:11.000Z",
      estimatedDuration: 1,
      serviceFee: 100000,
      startTime: "2023-12-10T15:25:11.000Z",
    };
    const anaesthesiaCost = {
      generalAnaesthesia: 300,
      localAnaesthesia: 100,
    };
    const overTime = calculateProcedureOvertime(
      procedureDetails,
      type,
      anaesthesiaCost
    );
    expect(overTime).toStrictEqual({ overtimeCost: 200, procedureHours: 3 });
  });

  it("procedure overtime for general anaesthesia should be zero when duration is equal to estimated duration", () => {
    const type = "generalAnaesthesia";
    const procedureDetails = {
      endTime: "2023-12-10T16:25:11.000Z",
      estimatedDuration: 1,
      serviceFee: 100000,
      startTime: "2023-12-10T15:25:11.000Z",
    };
    const anaesthesiaCost = { generalAnaesthesia: 300, localAnaesthesia: 100 };
    const overTime = calculateProcedureOvertime(
      procedureDetails,
      type,
      anaesthesiaCost
    );
    expect(overTime).toStrictEqual({ overtimeCost: 0, procedureHours: 1 });
  });

  it("procedure overtime  for general anaesthesia should be greater than zero when duration is not equal to estimated duration", () => {
    const type = "generalAnaesthesia";
    const procedureDetails = {
      endTime: "2023-12-10T18:25:11.000Z",
      estimatedDuration: 1,
      serviceFee: 100000,
      startTime: "2023-12-10T15:25:11.000Z",
    };
    const anaesthesiaCost = {
      generalAnaesthesia: 300,
      localAnaesthesia: 100,
    };
    const overTime = calculateProcedureOvertime(
      procedureDetails,
      type,
      anaesthesiaCost
    );
    expect(overTime).toStrictEqual({ overtimeCost: 600, procedureHours: 3 });
  });

  it("procedure overtime  for general anaesthesia should be zero when procedure start and end time is the same", () => {
    const type = "generalAnaesthesia";
    const procedureDetails = {
      endTime: "2023-12-10T18:25:11.000Z",
      estimatedDuration: 1,
      serviceFee: 100000,
      startTime: "2023-12-10T18:25:11.000Z",
    };
    const anaesthesiaCost = {
      generalAnaesthesia: 300,
      localAnaesthesia: 100,
    };
    const overTime = calculateProcedureOvertime(
      procedureDetails,
      type,
      anaesthesiaCost
    );
    expect(overTime).toStrictEqual({ overtimeCost: 0, procedureHours: 0 });
  });

  it("procedure overtime  for local anaesthesia should be zero when procedure start at 11pm and end time at 12am", () => {
    const type = "localAnaesthesia";
    const procedureDetails = {
      endTime: "2023-12-07T05:16:01.024Z",
      estimatedDuration: 1,
      serviceFee: 200,
      startTime: "2023-12-07T04:16:01.024Z",
    };
    const anaesthesiaCost = {
      generalAnaesthesia: 300,
      localAnaesthesia: 100,
    };
    const overTime = calculateProcedureOvertime(
      procedureDetails,
      type,
      anaesthesiaCost
    );
    expect(overTime).toStrictEqual({ overtimeCost: 0, procedureHours: 1 });
  });

  it("procedure overtime  for local anaesthesia should be 100 when procedure start at 12am and end time at 2am next day", () => {
    const type = "localAnaesthesia";
    const procedureDetails = {
      endTime: "2023-12-07T02:17:48-05:00",
      estimatedDuration: 1,
      serviceFee: 200,
      startTime: "2023-12-07T00:17:19-05:00",
    };
    const anaesthesiaCost = {
      generalAnaesthesia: 300,
      localAnaesthesia: 100,
    };
    const overTime = calculateProcedureOvertime(
      procedureDetails,
      type,
      anaesthesiaCost
    );
    expect(overTime).toStrictEqual({ overtimeCost: 100, procedureHours: 2 });
  });
  it("procedure overtime  for local anaesthesia should be r when procedure start at 11pm and end time at 2am next day", () => {
    const type = "localAnaesthesia";
    const procedureDetails = {
      endTime: "2023-12-07T02:46:04-05:00",
      estimatedDuration: 1,
      serviceFee: 200,
      startTime: "2023-12-07T04:16:01.024Z",
    };
    const anaesthesiaCost = {
      generalAnaesthesia: 300,
      localAnaesthesia: 100,
    };
    const overTime = calculateProcedureOvertime(
      procedureDetails,
      type,
      anaesthesiaCost
    );
    expect(overTime).toStrictEqual({ overtimeCost: 250, procedureHours: 3.5 });
  });
});
