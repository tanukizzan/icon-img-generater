import type { FC } from "hono/jsx";
import { AppShell } from "../templates/AppShell";
import { GeneratorLayout } from "../templates/GeneratorLayout";
import { IconNameCard } from "../organisms/IconNameCard";
import { ColorSettingsCard } from "../organisms/ColorSettingsCard";
import { DisplaySettingsCard } from "../organisms/DisplaySettingsCard";
import { DownloadCard } from "../organisms/DownloadCard";
import { PreviewCard } from "../organisms/PreviewCard";

export const HomePage: FC = () => (
  <AppShell title="アイコン画像ジェネレーター">
    <GeneratorLayout
      sidebar={
        <>
          <IconNameCard />
          <ColorSettingsCard />
          <DisplaySettingsCard />
          <DownloadCard />
        </>
      }
      main={<PreviewCard />}
    />
  </AppShell>
);
