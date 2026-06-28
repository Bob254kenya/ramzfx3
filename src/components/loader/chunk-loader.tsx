import { Loader } from '@deriv-com/ui';

export default function ChunkLoader({ message }: { message: string }) {
    return (
        <div className='app-root'>
            <div className='loader-spinner' style={{
                width: '50px',
                height: '50px',
                border: '5px solid rgba(255, 255, 255, 0.3)',
                borderTop: '5px solid #4CAF50',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}></div>
            <div className='load-message'>{message}</div>
        </div>
    );
}
