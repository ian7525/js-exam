import {
  createRecord
} from 'app/utils/record';
import { bindRoomCurrentRecord } from 'app/utils/room';
import graphqlActionHelper, {
  ACTION_STATE
} from 'app/utils/graphqlActionHelper';

function createRecordData({ subjectId, roomId, question }) {
  return async dispatch => {
    dispatch(
      graphqlActionHelper({
        method: 'CREATE',
        dataName: 'RECORD',
        actionState: ACTION_STATE.STARTED
      })
    );
    try {
      const result = await createRecord({ subjectId, roomId, question });
      dispatch(
        graphqlActionHelper({
          method: 'CREATE',
          dataName: 'RECORD',
          actionState: ACTION_STATE.SUCCESS,
          result
        })
      );
      // bind record to room
      await bindRoomCurrentRecord(roomId, result.id);
    } catch (error) {
      dispatch(
        graphqlActionHelper({
          method: 'CREATE',
          dataName: 'RECORD',
          actionState: ACTION_STATE.FAILURE,
          result: error
        })
      );
      console.log(error);
    }
  };
}

// for subscribe
function setCurrentRecord(result) {
  return {
    type: 'SET_CURRENT_RECORD',
    payload: result
  };
}
function resetCurrentRecord() {
  return {
    type: 'RESET_CURRENT_RECORD'
  };
}

export { createRecordData, setCurrentRecord, resetCurrentRecord };