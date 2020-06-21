import { reactive } from "@vue/composition-api";
import Event from "@/plugins/event";

function SelctInfo() {
  let selectInfo = reactive({
    info: {
      id: undefined,
      name: undefined,
    },
  });

  function updateInfo() {
    Event.$on("component.selectOne", info => {
      if (info) {
        const changeInfo = JSON.parse(info);
        selectInfo.info = changeInfo;
      }
    });
  }
  return { selectInfo, updateInfo };
}
export default SelctInfo;
