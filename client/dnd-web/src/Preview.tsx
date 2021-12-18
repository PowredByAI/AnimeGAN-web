import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react"

const Preview = ({ base64 }: { base64: string }) => {
    const [cartoon_base64, set_cartoon_base64] = useState<string>("")
    const [loading, set_loading] = useState<boolean>(true)
    const get = async (base64: string) => {
        const response = await fetch(
            `/api/cartoon`,
            {
                headers: {
                    'Content-Type': 'text/plain'
                },
                method: "POST",
                body: base64
            }
        );
        const data = await response.text();
        set_cartoon_base64(data)
        set_loading(false)
    }
    useEffect(() => {
        if (base64) {
            get(base64)
        }
    }, [base64])
    return (
        <div className="flex">
            <img className="item" src={`data:image/png;base64,${base64}`} />
            {
                loading ? <div className="item"><CircularProgress /></div> : <img className="item" src={`data:image/png;base64,${cartoon_base64}`} />
            }
        </div>
    )
}
export default Preview