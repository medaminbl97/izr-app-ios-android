import Bugsnag from "@bugsnag/expo";
Bugsnag.start();

const log = (error: any) => Bugsnag.notify(error);
const start = () => Bugsnag.start();

export default { log, start };
