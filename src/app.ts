import { Probot, Context } from "probot";

const removeLabel = (context: Context, labelName: string) => {
  return context.octokit.issues.removeLabel({
    issue_number: context.payload.issue.number,
    name: labelName,
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
  });
};

const addComment = (context: Context, labelName: string) => {
  return context.octokit.issues.createComment(
    context.issue({ body: labelName + " attached !" })
  );
};

const labelAction = (context: Context) => {
  const attachedLabelName = context.payload.label.name;

  return Promise.all([
    removeLabel(context, attachedLabelName),
    addComment(context, attachedLabelName),
  ]);
};

export const app = (app: Probot) => {
  app.on("issues.labeled", labelAction);
};
