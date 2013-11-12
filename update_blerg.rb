require 'ermahgerd'

# adapted from ermahgerd rubygem v0.0.1
def translate_word word
  # Don't translate short words
  return word if word.size == 1

  # Handle specific words
  dictionary = {
    'AWESOME' => 'ERSUM',
    'BANANA' => 'BERNERNER',
    'BAYOU' => 'BERU',
    'FAVORITE' => 'FRAVRIT',
    'FAVOURITE' => 'FRAVRIT',
    'GOOSEBUMPS' => 'GERSBERMS',
    'LONG' => 'LERNG',
    'MY' => 'MAH',
    'THE' => 'DA',
    'THEY' => 'DEY',
    'WE\'RE' => 'WER',
    'YOU' => 'U',
    'YOU\'RE' => 'YER',

    'awesome' => 'ersum',
    'banana' => 'bernerner',
    'bayou' => 'beru',
    'favorite' => 'fravrit',
    'favourite' => 'fravrit',
    'goosebumps' => 'gersberms',
    'long' => 'lerng',
    'my' => 'mah',
    'the' => 'da',
    'they' => 'dey',
    'we\'re' => 'wer',
    'you' => 'u',
    'you\'re' => 'yer',

    'Awesome' => 'Ersum',
    'Banana' => 'Bernerner',
    'Bayou' => 'Beru',
    'Favorite' => 'Fravrit',
    'Favourite' => 'Fravrit',
    'Goosebumps' => 'Gersberms',
    'Long' => 'Lerng',
    'My' => 'Mah',
    'The' => 'Da',
    'They' => 'Dey',
    'We\'re' => 'Wer',
    'You' => 'U',
    'You\'re' => 'Yer',
  }

  return dictionary[word] if dictionary.key? word
  
  # Before translating, keep a reference of the original word
  original_word = ""
  original_word << word

  word.upcase!

  # Drop vowel from end of words. Keep it for short words, like "WE"
  word.sub!(/[AEIOU]$/, '') if original_word.size > 2

  # Reduce duplicate letters
  word.gsub!(/[^\w]|(.)(?=\1)/, '')

  # Reduce adjacent vowels to one
  word.gsub!(/[AEIOUY]{2,}/, 'E')      # TODO: Keep Y as first letter

  # DOWN -> DERN
  word.gsub!(/OW/, 'ER')

  # PANCAKES -> PERNKERKS
  word.gsub!(/AKES/, 'ERKS')

  # The mean and potatoes: replace vowels with ER
  word.gsub!(/[AEIOUY]/, 'ER')    # TODO: Keep Y as first letter

  # OH -> ER
  word.gsub!(/ERH/, 'ER')

  #MY -> MAH
  word.gsub!(/MER/, 'MAH')

  #FALLING -> FERLIN
  word.gsub!('ERNG', 'IN')

  #POOPED -> PERPERD -> PERPED
  word.gsub!('ERPERD', 'ERPED')

  #MEME -> MAHM -> MERM
  word.gsub!('MAHM', 'MERM')

  # Keep Y as first character
  # YES -> ERS -> YERS
  word = 'Y' + word if original_word[0] == 'Y'

  # Reduce duplicate letters
  word.gsub!(/[^\w]|(.)(?=\1)/, '')

  # YELLOW -> YERLER -> YERLO
  if original_word.end_with?('LOW') && word.end_with?('LER')
    word.sub!(/LER$/, 'LO')
  end

  # Resolve case
  return word.downcase if original_word[0] >= 'a' and original_word[0] <= 'z' and original_word[-1] >= 'a' and original_word[-1] <= 'z'
  return word[0] + word[1..-1].downcase if original_word[0] >= 'A' and original_word[0] <= 'Z' and original_word[-1] >= 'a' and original_word[-1] <= 'z'

  return word

end

def translate words
  words.gsub(/[a-zA-Z]+/) { |word| translate_word(word) }
end

def translate_file from
  print "translating #{from}..."
  input = File.open from
  indata = input.read
  input.close

  outdata = ""
  i = 0
  indata.each_line do |l|
    if i == 3
      outdata += "title: "
      outdata += translate l[7..-1]
    elsif i <= 5 or l[0] == '<'
      outdata += l
    else
      if l.include? '](' and l.include? ')'
        t = ""
        while l.include? '](' and l.include? ')' do
          t += translate l[0..l.index('](')]
          t += l[(l.index('](')+1)..l.index(')')]
          l = l[(l.index(')')+1)..-1]
        end
        t += translate l
        outdata += t
      else
        outdata += translate l
      end
    end
    i += 1
  end

  to = translate(from).downcase
  to.gsub!("persts", "posts")

  output = File.open to, 'w'
  output.write outdata
  output.close
  puts "complete"
end

def translate_dir dir_path
  dir = Dir.new dir_path
  dir.each do |f|
    translate_file(dir_path + "/" + f) if f[-3..-1] == ".md"
  end
end

translate_dir "blog/_posts"
