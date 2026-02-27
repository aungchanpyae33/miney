import { outputView } from "@/utils/outputForView";
import { useTranslations } from "next-intl";
import { Multiple_input } from "../../../database.type-fest";
import MultipleList from "./viewComponent/MultipleList";
import { UserIcon } from "./formChild/icons";
import Name from "./viewComponent/Name";
import Bio from "./viewComponent/Bio";
import SingleText from "./viewComponent/SingleText";
import Age from "./viewComponent/Age";
import Friendliness from "./viewComponent/Friendliness";
import { ProfileDataOutput } from "@/type/dataType";
import Avatar from "./viewComponent/Avatar";
function ProfileViewContent({
  profileData,
}: {
  profileData: ProfileDataOutput;
}) {
  const t = useTranslations("FormView");
  const data = profileData;
  const viewUi = outputView(data);
  return (
    <div className=" w-full md:p-5 p-2  py-5 space-y-10 ">
      <div className=" space-y-4 flex flex-col items-center">
        {data.profile_avatar_url ? (
          <Avatar url={data.profile_avatar_url} />
        ) : (
          <UserIcon className="size-36 sm:size-40 text-ink-400" />
        )}

        {data.text_name && <Name name={data.text_name} />}

        {/* Bio */}
        {data.text_textarea_bio && <Bio bio={data.text_textarea_bio} />}
      </div>

      <span className="w-full h-[1px] bg-white/15"></span>

      {/* Basic Info */}
      <div className="w-full grid bg-zonecontainer rounded-lg sm:grid-cols-2 grid-cols-1 gap-4 p-4">
        {(viewUi.basic_info as Array<keyof typeof data>).map((key) => {
          if (key === "text_date_birth") {
            const item = data[key];
            if (!item) return;
            return <Age key={key} label={t(`${key}.label`)} year={item} />;
          }
          if (key === "text_select_friendness") {
            const item = data[key];
            return (
              <Friendliness
                key={key}
                label={t(`${key}.label`)}
                text_select_friendness={item}
              />
            );
          }
          if (key === "text_pick_mbti") {
            const item = data[key] as string | null;
            if (!item) return;
            return (
              <SingleText key={key} label={t(`${key}.label`)} data={item} />
            );
          }
          //did this because , select value need to be convert languagae by user perference
          const item = data[key] as string | null;
          if (!item) return;
          return (
            <SingleText
              key={key}
              label={t(`${key}.label`)}
              data={t(`${key}.options.${item}`)}
            />
          );
        })}
      </div>

      {(viewUi.multiple_fill as Array<keyof typeof data>).map((key) => {
        const items = data[key] as Multiple_input | null;
        if (!items || items.length === 0) return null;

        return (
          <MultipleList key={key} label={t(`${key}.label`)} items={items} />
        );
      })}
    </div>
  );
}

export default ProfileViewContent;
