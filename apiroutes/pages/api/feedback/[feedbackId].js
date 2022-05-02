import path from "path";
import {allFeedBacks} from "./index";

const Handler = (req, res) => {
    if(req.method === 'DELETE') {
        // delete item
    } else {
        const id = req.query.feedbackId;
        const filePath = path.join(process.cwd(), 'data', 'feedback.json')
        const data = allFeedBacks(filePath);
        const requiredFeedback = data.find(item => item.id === id);

        res.status(200).send({feedback: requiredFeedback})
    }
}

export default Handler;