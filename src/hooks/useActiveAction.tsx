import { useAppSelector } from "./reduxHooks";

const useActiveAction = () => {
  const {
    statusNotesCreating,
    statusNotesEditing,
    statusPasswordForNoteCreating,
  } = useAppSelector((state) => state.notes);
  const activeAction: boolean =
    statusNotesCreating || statusNotesEditing || statusPasswordForNoteCreating;
  return { activeAction };
};

export default useActiveAction;
