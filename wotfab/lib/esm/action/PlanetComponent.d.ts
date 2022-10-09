export default function PlanetComponent({ affTitle, affDesc, clickHandler, icon }: {
    affTitle: string;
    affDesc: string;
    clickHandler: () => void;
    icon: JSX.Element | undefined;
}): JSX.Element;
