import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/rest";

const GITHUB_USERNAME = "nurcinozer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const { data } = await octokit.gists.listForUser({
    username: GITHUB_USERNAME,
  });
  res.status(200).json(data);
}
