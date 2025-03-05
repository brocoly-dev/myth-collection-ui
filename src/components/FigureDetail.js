
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ReactImageGallery from "react-image-gallery";

const FigureDetail = (props) => {
    const { open, onClose, figurine } = props;

    const handleClose = () => {
        onClose();
    };

    const images = [
        { original: "https://imagizer.imageshack.com/img922/4751/PghUfm.jpg", thumbnail: "https://imagizer.imageshack.com/v2/150x100q70/922/PghUfm.jpg" },
        { original: "https://imagizer.imageshack.com/img923/6545/DpZf9i.jpg", thumbnail: "https://imagizer.imageshack.com/v2/150x100q70/923/DpZf9i.jpg" },
        { original: "https://imagizer.imageshack.com/img922/2629/nyZHSv.jpg", thumbnail: "https://imagizer.imageshack.com/v2/150x100q70/922/nyZHSv.jpg" },
    ];

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="xl" fullWidth>
            <DialogTitle>{figurine && figurine.displayableName}</DialogTitle>
            <DialogContent>
                <ReactImageGallery items={images} />;
            </DialogContent>
        </Dialog>
    );
}
export default FigureDetail;