import { PopupState } from 'src/app/shared/types/PopupState.enum';

const headingTexts = [
  {
    state: PopupState.WARN,
    text: 'Coś poszło nie tak!',
  },
  {
    state: PopupState.OK,
    text: 'Sukces!',
  },
  {
    state: PopupState.INFO,
    text: 'Uwaga!',
  },
];

export function getHeadingText(state: PopupState) {
  return (
    headingTexts.find((heading) => heading.state === state)?.text ||
    'Something go wrong'
  );
}
