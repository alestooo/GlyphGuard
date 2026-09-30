mod compare;
mod dto;
mod files;
mod inspect;
mod normalize;
mod scan;

pub use compare::compare_text_command;
pub use files::scan_file_command;
pub use inspect::inspect_text_command;
pub use normalize::normalize_text_command;
pub use scan::scan_text_command;
