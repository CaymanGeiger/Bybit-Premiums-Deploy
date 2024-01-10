export function Input(props) {
    return (
        <input
            {...props}
            style={{
                padding: '10px',
                margin: '5px 0',
                borderRadius: '4px',
                border: '1px solid #ccc'
                // Add more styles as needed
            }}
        />
    );
}
