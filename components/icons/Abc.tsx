interface AbcProps {
    className?: string;
}

const Abc = {

    DefaultIcon: ({ className = "" }: AbcProps) => {
        return (
            <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
        )
    }

}

export default Abc;
