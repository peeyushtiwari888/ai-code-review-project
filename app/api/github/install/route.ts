import { redirect } from "next/navigation";
import { getServerSession } from "@/features/auth/actions";
import { getUserInstallationId } from "@/features/github/server/installation";
import { getGithubInstallUrl } from "@/features/github/utils/github-app";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/sign-in?callbackUrl=/api/github/install");
  }

  const installationId = await getUserInstallationId(session.user.id);

  if (!installationId) {
    redirect(getGithubInstallUrl(session.user.id));
  }

  redirect(DASHBOARD_ROUTES.overview);
}
