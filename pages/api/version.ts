import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const buildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');
	const buildId = fs.existsSync(buildIdPath)
		? fs.readFileSync(buildIdPath, 'utf8').trim()
		: 'unknown';
	res.status(200).json({ buildId });
}
