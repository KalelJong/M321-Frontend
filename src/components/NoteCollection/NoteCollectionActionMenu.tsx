import { useNoteCollectionContext } from '@/contexts/note-collection.context';
import { NoteCollection } from '@/types/note-collection.interface';
import {
  KebabHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from '@primer/octicons-react';
import { ActionList, ActionMenu, IconButton } from '@primer/react';

function NoteCollectionActionMenu({
  noteCollection,
}: {
  noteCollection: NoteCollection;
}) {
  const {
    openNoteCollectionDialog,
    setSelectedNoteCollection,
    confirmDeleteNoteCollection,
  } = useNoteCollectionContext();
  return (
    <>
      <ActionMenu>
        <ActionMenu.Anchor>
          <IconButton
            icon={KebabHorizontalIcon}
            variant="invisible"
            aria-label="Open column options"
          />
        </ActionMenu.Anchor>

        <ActionMenu.Overlay>
          <ActionList>
            <ActionList.Item
              onSelect={() => {
                setSelectedNoteCollection(noteCollection);
                openNoteCollectionDialog('update');
              }}
            >
              <ActionList.LeadingVisual>
                <PencilIcon />
              </ActionList.LeadingVisual>
              Edit
              {/* <ActionList.TrailingVisual>⌘E</ActionList.TrailingVisual> */}
            </ActionList.Item>
            {/* <ActionList.Item onSelect={() => alert('Detach clicked')}>
            <ActionList.LeadingVisual>
              <UnlinkIcon />
            </ActionList.LeadingVisual>
            Detach notes
            <ActionList.TrailingVisual>⌘F</ActionList.TrailingVisual>
          </ActionList.Item> */}
            {/* <ActionList.Divider /> */}
            <ActionList.Item
              variant="danger"
              onSelect={() => {
                setSelectedNoteCollection(noteCollection);
                confirmDeleteNoteCollection(noteCollection);
              }}
            >
              <ActionList.LeadingVisual>
                <TrashIcon />
              </ActionList.LeadingVisual>
              Delete
              {/* <ActionList.TrailingVisual>⌘D</ActionList.TrailingVisual> */}
            </ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </>
  );
}

export default NoteCollectionActionMenu;
