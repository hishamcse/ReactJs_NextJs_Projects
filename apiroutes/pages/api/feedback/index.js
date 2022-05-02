import * as path from "path";
import * as fs from "fs";

export const allFeedBacks = (filePath) => {
    const readData = fs.readFileSync(filePath);
    return JSON.parse(readData);
}

const Handler = (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;
        const feedback = req.body.feedback;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            feedback: feedback
        }

        const filePath = path.join(process.cwd(), 'data', 'feedback.json')
        const data = allFeedBacks(filePath);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(201).json({message: 'success', feedback: feedback});

    } else {
        const filePath = path.join(process.cwd(), 'data', 'feedback.json')
        const data = allFeedBacks(filePath);
        res.status(200).json({feedbacks: data})
    }
}

export default Handler;