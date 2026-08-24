"use server";

import { getServerSession } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { deleteInstallation, getUserInstallationId } from "../server/installation";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { getGithubInstallUrl } from "../utils/github-app";



export async function disconnectGithubApp() {
    const session = await getServerSession();
  
    if (!session) {
      redirect("/sign-in");
    }
  
    await deleteInstallation(session.user.id);
    redirect(DASHBOARD_ROUTES.github);
  }

export async function connectGithubOnboarding() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in?callbackUrl=/api/github/install");
  }

  const installationId = await getUserInstallationId(session.user.id);

  if (!installationId) {
    redirect(getGithubInstallUrl(session.user.id));
  }

  redirect("/dashboard");
}