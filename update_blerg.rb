require 'ermahgerd'

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
      outdata += Ermahgerd.translate l[7..-1]
    elsif i <= 5 or l[0] == '<'
      outdata += l
    else
      if l.include? '](' and l.include? ')'
        t = ""
        while l.include? '](' and l.include? ')' do
          t += Ermahgerd.translate l[0..l.index('](')]
          t += l[(l.index('](')+1)..l.index(')')]
          l = l[(l.index(')')+1)..-1]
        end
        outdata += t
      else
        outdata += Ermahgerd.translate l
      end
    end
    i += 1
  end

  to = Ermahgerd.translate(from).downcase!.gsub("persts", "posts")
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
