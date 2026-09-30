#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ScalarInfo {
    pub scalar_index: usize,
    pub byte_index: usize,
    pub character: char,
    pub code_point: u32,
    pub utf8_bytes: Vec<u8>,
}

impl ScalarInfo {
    pub fn code_point_label(&self) -> String {
        format!("U+{:04X}", self.code_point)
    }

    pub fn utf8_hex(&self) -> String {
        self.utf8_bytes
            .iter()
            .map(|byte| format!("{byte:02X}"))
            .collect::<Vec<_>>()
            .join(" ")
    }
}

pub fn inspect_scalars(input: &str) -> Vec<ScalarInfo> {
    input
        .char_indices()
        .enumerate()
        .map(|(scalar_index, (byte_index, character))| {
            let mut buffer = [0_u8; 4];
            let encoded = character.encode_utf8(&mut buffer);

            ScalarInfo {
                scalar_index,
                byte_index,
                character,
                code_point: character as u32,
                utf8_bytes: encoded.as_bytes().to_vec(),
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn inspects_ascii_character() {
        let result = inspect_scalars("A");

        assert_eq!(result.len(), 1);
        assert_eq!(result[0].character, 'A');
        assert_eq!(result[0].code_point, 0x0041);
        assert_eq!(result[0].code_point_label(), "U+0041");
        assert_eq!(result[0].utf8_bytes, vec![0x41]);
        assert_eq!(result[0].byte_index, 0);
    }

    #[test]
    fn inspects_multibyte_utf8_character() {
        let result = inspect_scalars("é");

        assert_eq!(result.len(), 1);
        assert_eq!(result[0].character, 'é');
        assert_eq!(result[0].code_point, 0x00E9);
        assert_eq!(result[0].utf8_bytes, vec![0xC3, 0xA9]);
        assert_eq!(result[0].utf8_hex(), "C3 A9");
    }

    #[test]
    fn tracks_byte_offsets_correctly() {
        let result = inspect_scalars("Aé中");

        assert_eq!(result.len(), 3);

        assert_eq!(result[0].byte_index, 0);
        assert_eq!(result[1].byte_index, 1);
        assert_eq!(result[2].byte_index, 3);
    }

    #[test]
    fn empty_input_returns_no_scalars() {
        assert!(inspect_scalars("").is_empty());
    }
}
