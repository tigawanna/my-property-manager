import {
  createFileRoute,
  useLocation,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";

export const Route = createFileRoute("/list/$item/item-modal")({
  component: () => {
    const { item } = useParams({ from: "/list/$item/item-modal" });
    const navigate = useNavigate({
      from: "/list/$item/item-modal",
    });
    const location = useLocation();
    console.log(" === location  ==== ", location);
    return (
      <Modal>
        <p className="p-5 text-5xl">item: {item}</p>
      </Modal>
    );
  },
});

function Modal(props: Dialog.DialogProps) {
  return (
    <Dialog.Root open {...props} >
      <Dialog.Portal >
        <Dialog.Overlay className="fixed top-[20%] bottom-[20%] left-[20%] right-[20%] bg-base-200/30" />
        <Dialog.DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title>Title</Dialog.Title>
          <Dialog.Description>Description</Dialog.Description>
          {props.children}
        </Dialog.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
