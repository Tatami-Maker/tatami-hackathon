import { useRouter } from "next/router"
import { FC, useState } from "react";
import { notify } from "../../utils/notifications";

type Props = {
    seq: number
}

export const UpdatePay: FC<Props> = ({seq}: Props) => {
    const router = useRouter();
    const [disable, setDisable] = useState(false);

    const onClick = async() => {
        if (disable) {
            return;
        }

        setDisable(true);

        try {
            const res = await fetch('/api/token/update', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                seq,
                type: 'pay'
                }),
            })
        
            if (!res.ok) {
                throw new Error(res.status.toString())
            }
    
            const {data} = await res.json();
            setDisable(false);
            router.push('/token/'+data.seq)
        } catch (err) {
            notify({ type: 'error', message: 'error', description: err});
            setDisable(false);
        }
    }
    return (
        <div className="inline-block text-sm py-3 px-4 rounded-lg cursor-pointer
        text-[#9393A9]" onClick={onClick}>
            Refresh
        </div>
    )
}