export default function makeActionCreator(type) {
  function actionCreator(payload) {
    return {
      type,
      payload,
    };
  }
  actionCreator.type = type;
  return actionCreator;
}
