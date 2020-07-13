export default {
  components: {
    'form-item': {
      render: function (createElement, context) {
        return createElement(
          'el-form-item',
          [
            createElement('el-' + this.label)
          ]
        )
      },
      props: ['label', 'value', 'data']
    }
  }
}