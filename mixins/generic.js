export const GenericMixin = {
  data() {
    return {};
  },
  methods: {
    isEmpty(val) {
      if (val == "" || val == undefined || val == null) {
        return true;
      }
      return false;
    },
  },
};
