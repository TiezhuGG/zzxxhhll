<template>
  <div class="approval-left">
    <Search />
    <AddMember />
    <LeftStatus v-on="$listeners" />
  </div>
</template>

<script>
import LeftStatus from "./LeftStatus";
import AddMember from "../../contact/components/AddMember";
import Search from "../../contact/components/Search";

export default {
  name: "ApprovalLeft",
  data() {
    return {};
  },
  methods: {},
  components: {
    AddMember,
    Search,
    LeftStatus
  }
};
</script>

<style lang="scss" scoped>
.approval-left {
  width: 389px;
  height: calc(100vh - 47px);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>