import { useState } from 'react';
import { motion } from 'framer-motion';


// const Loader = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   right: 0;
//   left: 0;
//   bottom: 0;
//   background: #18315B;
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;

export const LoaderExample = () => {
    const [isLoading, setIsLoading] = useState(true)

    const loading = () => {
        setIsLoading(!isLoading)
    }
    return (
        <motion.div className='fixed z-50 top-0 right-0 bottom-0 left-0 bg-[#f8fbff] text-black flex items-center justify-center  flex-col'>
            {/* CLICK ME!!! */}
            <h2 className='text-[25px] md:text-[50px] my-2 text-center'>Generating Trip</h2>
            {isLoading && (
                <>
                    <span className='font-bold text-xl my-3'>Wait a moment ...</span>
                    <br />
                    <motion.div
                        animate={{
                            rotate: 360,
                            borderRadius: ["2% 50%", "50% 50%", "3% 50%"],
                            backgroundColor: ["#9A77CF", "#543884", "#262254", "#A13670", "#EC4176", "#FFA45E"],
                            x: 120
                        }}
                        initial={{
                            x: -120,
                        }}
                        exit={{ x: -120 }}
                        transition={{
                            flip: Infinity,
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 2,
                            ease: "easeInOut",
                        }}
                        style={{
                            height: "60px",
                            background: "#E81B63",
                            width: "60px",
                            borderRadius: "2% 50%",
                        }}
                    >
                    </motion.div>
                </>
            )}
        </motion.div>
    )
}