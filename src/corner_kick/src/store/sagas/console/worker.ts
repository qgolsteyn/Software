import { TOPIC_ROSOUT, TOPIC_ROSOUT_TYPE } from 'SRC/constants';
import { ROS } from 'SRC/utils/ros';

const ctx: Worker = self as any;

function main() {
    const ros = new ROS();

    ros.connect();
    ros.subscribeToROSTopic(TOPIC_ROSOUT, TOPIC_ROSOUT_TYPE, (message) => {
        ctx.postMessage(message);
    });
}

main();
